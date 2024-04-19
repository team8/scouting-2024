var _ = require('lodash');

const makeChanges = (diffs, obj) => {
    // console.log("Params for this level: ")
    // console.log(diffs)
    // console.log(obj)
    // console.log("\n")
    if (diffs === "no change") {
        return obj;
    }
    var newObj = Array.isArray(obj) ? [...obj] : { ...obj }

    //key change
    diffs.map((diff) => {
        if (diff.mode === "key change") {
            if (diff.coordinate.length === 1) {
                console.log("here")
                var keysMap = {};
                keysMap[diff.coordinate[0]] = diff.value;
                newObj = Object.keys(newObj).reduce(
                    (acc, key) => ({
                        ...acc,
                        ...{ [keysMap[key] || key]: newObj[key] },
                    }),
                    {}
                )
                console.log(newObj)
            } else {

                newObj[Array.isArray(newObj) ? parseInt(diff.coordinate[0]) : diff.coordinate[0]] = makeChanges([{ ...diff, coordinate: diff.coordinate.slice(1) }], obj[diff.coordinate[0]])
            }

        }
    })

    //Insertion/deletion
    diffs.map((diff) => {
        if (diff.mode === "insertion") {

            if (diff.coordinate.length === 1) {

                Array.isArray(newObj) ? newObj.push(diff.value) : newObj[diff.coordinate[0]] = diff.value;
            } else {
                newObj[Array.isArray(newObj) ? parseInt(diff.coordinate[0]) : diff.coordinate[0]] = makeChanges([{ ...diff, coordinate: diff.coordinate.slice(1) }], obj[diff.coordinate[0]])
            }

        } else if (diff.mode === "deletion") {
            if (diff.coordinate.length === 1) {
                const deleteIndex = _.findIndex(newObj, diff.value);
                Array.isArray(newObj) ? newObj.splice(deleteIndex, 1) : delete newObj[deleteIndex];
            } else {
                newObj[Array.isArray(newObj) ? parseInt(diff.coordinate[0]) : diff.coordinate[0]] = makeChanges([{ ...diff, coordinate: diff.coordinate.slice(1) }], obj[diff.coordinate[0]])
            }
        }
    })

    //reorder
    diffs.map((diff) => {
        if (diff.mode === "reorder") {
            if (diff.coordinate.length === 1) {
                var temp = newObj[diff.coordinate[0]];
                newObj.splice(diff.coordinate[0], 1);
                newObj.splice(diff.value, 0, temp);
            } else {
                newObj[Array.isArray(newObj) ? parseInt(diff.coordinate[0]) : diff.coordinate[0]] = makeChanges([{ ...diff, coordinate: diff.coordinate.slice(1) }], obj[diff.coordinate[0]])
            }
        }
    })

    //edit
    diffs.map((diff)=>{
        if (diff.mode === "edit"){
            if (diff.coordinate.length === 1){
                newObj[diff.coordinate[0]] = diff.value;
            }else{
                newObj[Array.isArray(newObj) ? parseInt(diff.coordinate[0]) : diff.coordinate[0]] = makeChanges([{ ...diff, coordinate: diff.coordinate.slice(1) }], obj[diff.coordinate[0]])
            }
        }
    })

    return newObj;
}

module.exports = {makeChanges};