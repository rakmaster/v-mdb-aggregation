interface Props {
    modelValue: string;
    placeholder?: string;
    rows?: number | string;
    disabled?: boolean;
    readonly?: boolean;
    textareaClass?: string;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string) => any;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    placeholder: string;
    rows: number | string;
    disabled: boolean;
    readonly: boolean;
    textareaClass: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
