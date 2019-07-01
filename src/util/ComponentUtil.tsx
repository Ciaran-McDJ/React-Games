import * as React from "react";

type ViableElemStrings = keyof React.ReactHTML;
type ElementType<
    S extends ViableElemStrings
> = React.ReactHTML[S] extends React.DetailedHTMLFactory<any, infer T>
    ? T
    : never;
type ElementProps<S extends ViableElemStrings> = JSX.IntrinsicElements[S];
/**
 * Decorator for React components to preserve the displayName after the component is uglified
 * The display name is also used by Container helper in the css class name for styling.
 */
export function PreserveClassName(name: string) {
    function decorator<C extends React.ComponentClass>(cls: C) {
        cls.displayName = name;
    }
    return decorator;
}

interface FlexContainerProps<ContaienrProps> {
    /**
     * ID for the container element.
     */
    id?: string;
    _containerProps?: ContaienrProps;
}
/**
 * Creates a base class for a container,  Implement the method renderContent() instead of render.
 * The containing div will be handled within this class.
 *
 * Optionally you can also override these methods:
 * - renderHeader which is put before the main content, if this is a flex row this is actually displayed on the left
 * - renderFooter which is put after the main content, if this is a flex row this is actually displayed on the right
 * - computeContainerProps which returns props to apply to the container. if any props are given
 */
export function Container<ElemString extends ViableElemStrings>(
    elem: ElemString,
    flow: "row" | "column",
) {
    let arrangeContent: (
        props: ElementProps<ElemString>,
        main: React.ReactNode,
        header: React.ReactNode,
        footer: React.ReactNode,
        left: React.ReactNode,
        right: React.ReactNode,
    ) => React.ReactNode;
    switch (flow) {
        case "column": {
            arrangeContent = (props, main, header, footer, left, right) => {
                const container = React.createElement(
                    elem,
                    props,
                    // in column the header and footer come inside the component
                    header,
                    main,
                    footer,
                );
                return (
                    <React.Fragment>
                        {left}
                        {container}
                        {right}
                    </React.Fragment>
                );
            };
            break;
        }
        case "row": {
            arrangeContent = (props, main, header, footer, left, right) => {
                const container = React.createElement(
                    elem,
                    props,
                    // in row the left and right come inside the component.
                    left,
                    main,
                    right,
                );
                return (
                    <React.Fragment>
                        {header}
                        {container}
                        {footer}
                    </React.Fragment>
                );
            };
            break;
        }
        default: {
            break;
        }
    }
    abstract class FLEXCONTAINER<
        Props,
        State = {},
        SnapShot = void
    > extends React.Component<
        Props & FlexContainerProps<ElementProps<ElemString>>,
        State,
        SnapShot
    > {
        /**
         * Renders the main content in the container,
         * unlike the standard render method this can return a direct ReactNode such as a string.
         * To give several elements it is recommended to use a React.Fragment.
         */
        public abstract renderContent(): React.ReactNode;
        /**
         * Returns a header for the component. Note that if this is a column it is placed INSIDE the container
         * And if the contaner is a row then this is placed BEFORE it. IF a row component defines a header it
         * depends on being placed within a column.
         *
         * usually this should be a <header> element.
         */
        public renderHeader(): React.ReactNode {
            return null;
        }
        /**
         * returns a <footer> component to be placed below the container.
         * If the container is a row this will actually be placed AFTER the container
         * so it would rely on being placed in a column.
         */
        public renderFooter(): React.ReactNode {
            return null;
        }
        /**
         * Returns usually an <aside> to display to the left of the content
         * Note that if this is a column the left content would be placed BEFORE the container
         * so it would rely on being inside a column.
         */
        public renderLeftSide(): React.ReactNode {
            return null;
        }
        /**
         * Returns usually an <aside> to display to the right of the content.
         * Note if this is a column container this will be displayed AFTER the container
         * so it relies on being placed inside a row to work properly.
         */
        public renderRightSide(): React.ReactNode {
            return null;
        }
        /**
         * Returns props on the main component, style and className is merged into specifications from elsewhere.
         * Remember that style that is constant for the component should be put in a .less file for the classname.
         *
         */
        public computeContainerProps(): ElementProps<ElemString> {
            return {};
        }
        protected readonly containerRef: ElementProps<
            ElemString
        >["ref"] = React.createRef();
        public render() {
            const props = this._computeContainerPropsInternal();
            return arrangeContent(
                props,
                this.renderContent(),
                this.renderHeader(),
                this.renderFooter(),
                this.renderLeftSide(),
                this.renderRightSide(),
            );
        }
        /**
         * computes the props for the container element, this handles dealing with
         * merging the props from this.props._containerProps and this.computeContainerProps
         * and handle the classnames applied to the container.
         */
        private _computeContainerPropsInternal() {
            const displayName = (this.constructor as React.ComponentClass)
                .displayName;
            if (displayName === undefined) {
                throw new Error(
                    `Component must have a displayName in order to use FlexContainer, 
                use PreserveClassName to do that.`,
                );
            }
            const classNames = [displayName, `FlexBox-${flow}`];
            // if (flow !== "none") {
            //     classNames.push();
            // }
            const ownProps = this.computeContainerProps();
            if (ownProps.className !== undefined) {
                classNames.push(ownProps.className);
            }
            if (
                this.props._containerProps !== undefined &&
                this.props._containerProps.className !== undefined
            ) {
                classNames.push(this.props._containerProps.className);
            }
            const props: ElementProps<ElemString> = {
                ...this.props._containerProps,
                ...ownProps,
                style: {
                    // let ownProps styling override anything passed in from parent.
                    ...(this.props._containerProps !== undefined &&
                        this.props._containerProps.style),
                    ...(ownProps.style !== undefined && ownProps.style),
                },
                className: classNames.join(" "),
            };
            // for some reason putting the ref in the object literal fails but here it doesn't?
            props.ref = this.containerRef;
            if (this.props.id !== undefined) {
                // do this conditonally so if ownProps set an ID then it will only
                // be overriden if the parent specified an ID.
                props.id = this.props.id;
            }
            return props;
        }
    }
    return FLEXCONTAINER;
}
