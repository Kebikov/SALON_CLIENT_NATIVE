


type ICompany = {
    name: string;
    debts: number;
}

const hh: ICompany = {
    name: 'HH',
    debts: 4000
}


type keyHH = ICompany['debts'];
type keyICompany = keyof ICompany;
