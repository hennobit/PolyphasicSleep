export default (grad: number): [number, number] => {
    const stunden = Math.floor(grad / 15);
    const minuten = Math.round((grad % 15) / 0.25);

    return [stunden, minuten];
};
