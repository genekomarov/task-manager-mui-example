const arrayToStringArguments = (argName: string, argArray: Array<number | string> | null) =>
    argArray
        ? argArray.map((arg) => `${argName}=${arg}&`).toString().replace(/,/g,'')
        : ""

export default arrayToStringArguments