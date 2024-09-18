export const getPosition = (valueStr: string, heightItem: number, arrayStr: string[]) => {
    const index = arrayStr.indexOf(valueStr);

    if(index === 0) {
        return 3 * heightItem;
    } else if(index === 1) {
        return 2 * heightItem;
    } else if(index === 2) {
        return heightItem;
    } else {
        return (index - 3) * heightItem * -1;
    }
}