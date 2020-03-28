import * as React from "react";
const USESTATE = React.useState;
type GenEffect = Generator; //<  IArguments | Array<any> | void | undefined | void | (() => void)>;
function isArguments(item: any): item is IArguments {
    return Object.prototype.toString.call(item) === "[object Arguments]";
}
function useGenEffectDev(effect: GenEffect) {
    const firstYield = effect.next();
    if (firstYield.done) {
        throw Error(
            "effect ended immidiately, did you forget to 'yield arguments'?"
        );
    } else if (
        !(isArguments(firstYield.value) || firstYield.value instanceof Array)
    ) {
        throw Error(
            "first yield was not array or arguments, did you forget to 'yield arguments'?"
        );
    }
    const deps = firstYield.value as any[];
    React.useEffect(() => {
        const secondYield = effect.next();
        if (secondYield.done) {
            // effect will return nothing (no cleanup) or a cleanup function to mimic normal usage
            // either way we give that to react for cleanup.
            return secondYield.value;
        } else if (secondYield.value === undefined) {
            // otherwise we had a second yield, so cleanup is to finish the generator.
            return () => {
                const fin = effect.next();
                if (!fin.done) {
                    throw Error("effect didn't finish after cleanup.");
                }
            };
        } else {
            throw Error(
                "cannot yield a second value between effect and cleanup"
            );
        }
    }, deps);
}
function useGenEffectProd(effect: GenEffect) {
    const deps = effect.next().value;
    React.useEffect(() => {
        // effect is calling the next section
        const cleanup = effect.next();
        if (cleanup.done) {
            // if no second yield then we expect either nothing to be returned
            // for no cleanup or a function to do cleanup (same style as normal useEffect)
            // either way return it to react to handle.
            return cleanup.value;
        } else {
            // there was a second yield in the function, cleanup is to finish the function.
            return () => {
                effect.next();
            };
        }
    });
}

export const useGenEffect = useGenEffectDev;

// function* registerListenerEffect(callback: ()=>void){
//     yield arguments
//     // do effect
//     yield
//     // do cleanup
// }
class Placeholder<A> {
    constructor(
        type: "state",
        public value: A,
        public check_diff?: (prev: A, curr: A) => boolean
    ) {}
}
function makeStateVariable<T>(
    initialValue: T,
    check_diff?: (prev: T, curr: T) => boolean
): T {
    return new Placeholder("state", initialValue, check_diff) as any;
}
abstract class HookedComponent<P> {
    abstract useRender(props: P): React.ReactElement<any>;
    /**
     * this stores the value given by React.useState for each magic state field.
     * these are not updated immidiately upon changing a field but before useRender is called during rendering
     */
    private _internal_store: Record<string, any> = {};
    /**
     * dictionary of updators given by React.useState for each magic state field.
     */
    private _internal_updaters: Record<string, (val: any) => void> = {};
    /**
     * this takes a HookedComponent subclass and returns a proper react component class
     * which can be used.
     * @param Cls HookedComponent class to finalize
     */
    public static finalize<P>(Cls: new () => HookedComponent<P>) {
        function Component(props: P, ref: React.Ref<InstanceType<typeof Cls>>) {
            const [self, do_render] = React.useMemo(() => {
                const thing = new Cls();
                const state_fields = HookedComponent.correctPlaceholders(thing);
                function use_render(props: P) {
                    for (const field of Object.getOwnPropertyNames(
                        state_fields
                    )) {
                        [
                            thing._internal_store[field],
                            thing._internal_updaters[field]
                        ] = USESTATE(state_fields[field].value);
                    }
                    return thing.useRender(props);
                }
                return [thing, use_render] as [typeof thing, typeof use_render];
            }, []);
            React.useImperativeHandle(ref, () => self, []);
            return do_render(props);
        }
        return React.forwardRef(Component);
    }
    /**
     * replaces the placeholder fields in an instance with property descriptors which will
     * run react updates when updated and read from internal store.
     *
     * Doing this for each instance is very bad for performance, it would be significally prefered to
     * do it for the class prototype instead, except for sake of simplicity we don't want to change the
     * base class in any way, instead we only do magic functionality inside finallize.
     * @param inst instance that has been constructed but still has placeholder fields
     */
    private static correctPlaceholders(inst: HookedComponent<any>) {
        const state_fields: Record<string, Placeholder<any>> = {};
        for (const field in Object.getOwnPropertyNames(inst)) {
            const value = inst[field];
            if (value instanceof Placeholder) {
                state_fields[field] = value.value;
                delete inst[field];
                const desc = Object.getOwnPropertyDescriptor(inst, field);
                console.log("descriptor", field, desc);
                for (const f of Object.getOwnPropertyNames(desc)) {
                    delete desc![f];
                }
                desc!.get = function get() {
                    return inst._internal_store[field];
                };
                desc!.set = function set(v) {
                    inst._internal_updaters[field](v);
                };
            }
        }
        return state_fields;
    }
}

class TestComponent extends HookedComponent<{}> {
    private count = makeStateVariable(0);
    public useRender(props: {}) {
        console.log("COUNT HERE", this.count);
        return (
            <button
                onClick={() => {
                    this.count += 1;
                }}
            >
                count to
            </button>
        );
    }
}

export default HookedComponent.finalize(TestComponent);
