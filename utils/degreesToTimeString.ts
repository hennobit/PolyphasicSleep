export default (grad: number): string => {
    const stunden = Math.floor(grad / 15);
    const minuten = Math.round((grad % 15) * 4);

    const stundenStr = stunden.toString().padStart(2, '0');
    const minutenStr = minuten.toString().padStart(2, '0');

    return `${stundenStr}:${minutenStr}`;
};
