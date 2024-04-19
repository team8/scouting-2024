var _ = require('lodash');


const findDifferences = (og, changed, currDiff) => {
    var diffList = [];


    if (_.isEqual(og, changed)) {
        return "no change"
    }
    if (typeof og == "object" && typeof changed == "object") {
        const ogKeys = Object.keys(og)
        const changedKeys = Object.keys(changed)
        const ogVals = Object.values(og)
        const changedVals = Object.values(changed)

        if (_.isEqual(ogKeys, changedKeys)) {
            if (Array.isArray(og)) {
                var startChange = null;
                var endChange = null;
                for (var i = 0; i < og.length; i++) {
                    if (!_.isEqual(og[i], changed[i])) {
                        if (typeof startChange != "number") {
                            startChange = i;
                        }
                        endChange = i;

                    }

                }
                if (_.isEqual(og[startChange], changed[endChange])) {
                    //forward
                    diffList.push({ "coordinate": [...currDiff, startChange], "mode": "reorder", "value": endChange })
                    for (var i = startChange + 1; i > startChange && i <= endChange; i++) {
                        const diffs = findDifferences(og[i], changed[i - 1], [...currDiff, i - 1]);
                        if (diffs != "no change") {
                            diffList = [...diffList, ...diffs];
                        }
                    }
                } else if (_.isEqual(og[endChange], changed[startChange])) {
                    //backward
                    diffList.push({ "coordinate": [...currDiff, endChange], "mode": "reorder", "value": startChange })
                    for (var i = startChange; i >= startChange && i < endChange; i++) {
                        const diffs = findDifferences(og[i], changed[i + 1], [...currDiff, i + 1]);
                        if (diffs != "no change") {
                            diffList = [...diffList, ...diffs];
                        }
                    }

                } else {
                    ogKeys.map((key) => {
                        const diffs = findDifferences(og[key], changed[key], [...currDiff, key]);
                        if (diffs != "no change") {
                            diffList = [...diffList, ...diffs];
                        }
                    })
                }
            } else {
                ogKeys.map((key) => {
                    const diffs = findDifferences(og[key], changed[key], [...currDiff, key]);
                    if (diffs != "no change") {
                        diffList = [...diffList, ...diffs];
                    }
                })
            }

        } else {
            const isArray = Array.isArray(og);

            var normal = []
            var modifiedOgKeys = [...ogKeys]
            var modifiedOgVals = [...ogVals]
            var modifiedChangedKeys = [...changedKeys]
            var modifiedChangedVals = [...changedVals]

            console.log(ogKeys);
            console.log(changedKeys);
            console.log(ogVals);
            console.log(changedVals);
            console.log("Looping:");

            (isArray ? ogVals : ogKeys).map((key) => {
                
                if (_.some(isArray ? changedVals : changedKeys, key)) {
                   
                    (isArray ? modifiedOgVals : modifiedOgKeys).splice(_.findIndex((isArray ? modifiedOgVals : modifiedOgKeys), key), 1);

                    normal.push(key);
                    
                    (isArray ? modifiedChangedVals : modifiedChangedKeys).splice(_.findIndex((isArray ? modifiedChangedVals : modifiedChangedKeys), key), 1);
                }
            })
            console.log("Post loop:");
            console.log(modifiedOgVals);
            console.log(modifiedChangedVals);
            console.log(normal);


            (!isArray && normal.map((key) => {
                const diffs = findDifferences(og[key], changed[key], [...currDiff, key]);
                if (diffs != "no change") {
                    diffList = [...diffList, ...diffs];
                }
            }));

            (isArray ? modifiedOgVals : modifiedOgKeys).map((key) => {
                console.log("heheh")
                console.log(key);
                var keyChange = false;
                var mapBroken = false;
                (!isArray && modifiedChangedKeys.map((ckey) => {
                    if (_.isEqual(og[key], changed[ckey]) && !mapBroken) {
                        diffList.push({ "coordinate": [...currDiff, key], "mode": "key change", "value": ckey })
                        keyChange = true
                        mapBroken = true
                        modifiedChangedKeys.splice(modifiedChangedKeys.indexOf(ckey), 1)
                    }
                }));
                if (!keyChange) {
                    if (isArray) {
                        diffList.push({ "coordinate": [...currDiff, _.findIndex(og, key)], "mode": "deletion", value: key })
                    } else {
                        diffList.push({ "coordinate": [...currDiff, key], "mode": "deletion", value: og[key] })
                    }
                }


            });
                (isArray ? modifiedChangedVals : modifiedChangedKeys).map((key) => {
                    if (isArray) {
                        diffList.push({ "coordinate": [...currDiff, _.findIndex(changed, key)], "mode": "insertion", "value": key })

                    } else {
                        diffList.push({ "coordinate": [...currDiff, key], "mode": "insertion", "value": changed[key] })
                    }
                })

        }

    }
    else {
        diffList.push({ "coordinate": currDiff, "mode": "edit", "value": changed })
    }
    return diffList;
}

module.exports = {findDifferences};