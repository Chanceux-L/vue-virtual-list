import { Emits, Props, VirtualListInstance } from './types';
declare const _default: <T>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{
        readonly onTopArrived?: (() => any) | undefined;
        readonly onBottomArrived?: (() => any) | undefined;
    } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, never>, "onTopArrived" | "onBottomArrived"> & Props<T> & Partial<{}>> & import('vue').PublicProps;
    expose(exposed: import('vue').ShallowUnwrapRef<VirtualListInstance<T>>): void;
    attrs: any;
    slots: {
        default?(_: {
            item: T & {
                index: number;
            };
            index: number;
        }): any;
    };
    emit: Emits;
}>) => import('vue').VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
