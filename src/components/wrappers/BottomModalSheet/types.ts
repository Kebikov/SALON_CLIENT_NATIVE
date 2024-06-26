export interface IRefBottomModalSheet {
    openModal: () => void;
    closeModal: () => Promise<void>;
}

export interface IBottomModalSheet {
    children: JSX.Element | JSX.Element[];
    heightProcent?: number;
    backgroundColorHeader?: string;
    borderRadiusHeader?: number;
    backgroundColorBody?: string;
    backgroundColorLine?: string;
    buttonForModal?: JSX.Element | JSX.Element[];
    durationOpenAndClose?: number;
    isWithScrooll?: boolean;
}