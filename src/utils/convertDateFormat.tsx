export const convertDateYYMMDD = (date) => {
    
    const mm = date.$M + 1
    const mon = mm<10 ? `0${mm}`: `${mm}` 
    const day = date.$D<10 ? `0${date.$D}`: `${date.$D}`
    const newDate = (`${date.$y}-${mon}-${day}`)

    return newDate
}