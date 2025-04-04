
export const getPeriodTime = (weekBack: number) => {
    const initDate = getInitTime(weekBack);
    const finishDate=  getFinishTime(weekBack)
    return {initial:initDate, final:finishDate }
};

const getInitTime = (weekBack:number) => {
    const date = new Date();
    const passedTime = 4-date.getDay()
    const timeDiff = passedTime + 7

    const timeBack = weekBack === 0 ? 7 : (weekBack+1) * 7
    const newDate = new Date();
    newDate.setDate(newDate.getDate()+timeDiff-timeBack)

    console.log(newDate.toDateString())
    return newDate;
}
const getFinishTime = (weekBack:number) =>{
    const date = new Date();
    const passedTime = 2-date.getDay()
    const timeDiff = passedTime + 7

    const timeBack = weekBack * 7
    const newDate = new Date();
    newDate.setDate(newDate.getDate()+timeDiff-timeBack)

    console.log(newDate.toDateString())
    return newDate;
}