export const dateToFrenchFormat = (dateStr) => {
    const date = new Date(dateStr)

    const options = { day: "numeric", month: "long", year: "numeric" }

    
return date.toLocaleDateString("fr-FR", options)
}