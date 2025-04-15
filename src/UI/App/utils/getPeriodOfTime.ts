
export const getPeriodTime = (weekBack: number) => {

    const initDate = getInitTime(weekBack);
    const finishDate = getFinishTime(weekBack)
    return { initial: initDate, final: finishDate }
};

export const getInitTime = (weekBack: number) => {
    const date = new Date();
    const weekToReturn = date.getDay() > 3 ? 0 : 1
    const weekBackValue = weekToReturn+weekBack;
    const passedTime = 4 - date.getDay()
    const timeDiff = passedTime + 7

    const timeBack = weekBackValue === 0 ? 7 : (weekBackValue + 1) * 7
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + timeDiff - timeBack)
    newDate.setHours(0, 0, 0, 0)

    return newDate;
}
export const getFinishTime = (weekBack: number) => {
    const date = new Date();
    const weekToReturn = date.getDay() > 3 ? 0 : 1
    const weekBackValue = weekToReturn+weekBack;

    const passedTime = 2 - date.getDay()
    const timeDiff = passedTime + 7

    const timeBack = weekBackValue * 7
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + timeDiff - timeBack)
    newDate.setHours(23, 59, 59, 59)

    return newDate;
}