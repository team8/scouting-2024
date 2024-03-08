const keys = require('../models/keys.json');

/* 
Collection app QR code encodeStringData function encodes data in such a way that you
cannot simply pass the string into JSON.parse() to retrieve the data in
object form. The stringToJSON function fixes this and converts upload
data request bodies into a usable data format.
*/
const stringToJSON = (input) => {
    input = input.substring(1, input.length - 1);

    let currentKey, currentValue = "";
    let object = {};
    let arrayDepth = 0;
    let inArray = false;

    for (let i = 0; i < input.length; i++) {
        let char = input[i];

        if (char === "[") {
            arrayDepth++;
            inArray = true;
            currentValue += char;
        } else if (char === "]") {
            arrayDepth--;
            if (arrayDepth === 0) {
                inArray = false;
            }
            currentValue += char;
        } else if (char === "," && arrayDepth === 0) {
            object[currentKey.trim()] = currentValue.trim();
            currentKey = currentValue = "";
        } else if (char === ":" && !inArray) {
            currentKey = currentValue;
            currentValue = "";
        } else {
            currentValue += char;
        }
    }

    object[currentKey.trim()] = currentValue.trim();

    return object;
}

/* 
 this function parses an array from a string. 
 For instance, for the inputs of '[a,b,c]' or '[[a,b,c],[d,e,f]]'
 the function will return [a,b,c] and [[a,b,c],[d,e,f]] as arrays 
*/


const parseStringArray = (input) => {
    let type = ''
    if (input[0] === '[') {
        type = 'array'
    } else if (input[0] === "{") {
        type = 'object'
    } else {
        return input
    }
    let childrenString = input.substring(1, input.length)
   
    

    if (type == 'array') {
        let childrenList = []
        let inChild = false
        let currChild = ''
        let arrayDepth = 0
        
        for (i in childrenString) {
           
            
            currChild += childrenString[i]
            if ( '[{'.includes(childrenString[i])) {
                arrayDepth++
            }else if(']}'.includes(childrenString[i])) {
                arrayDepth--
            }
            else if (childrenString[i] === ',' && arrayDepth === 0) {
                
                    currChild = currChild.substring(0, currChild.length - 1)
                    childrenList.push(currChild)
                    currChild = ''
                
            }
            if (i === (childrenString.length - 1).toString()){
                    currChild = currChild.substring(0,currChild.length-1)
                    currChild != '' && childrenList.push(currChild)
                    currChild = ''
            }
        }
      
        let correctedChildrenList = []
        for (i in childrenList){
           
            
        
            correctedChildrenList.push(parseStringArray(childrenList[i]))
            
        }
       
        
        return correctedChildrenList
    } else if (type == 'object') {
        let correctedObject = {}
        let currKey = ""
        let currValue = ""
        let isKey = true
        let inObj = true
        
     
        for (i in childrenString) {
            if (childrenString[i] === "[") {
                inObj = false
            }
            else if (childrenString[i] === "]") {
                inObj = true
            }
            if (inObj) {
                if (childrenString[i] === ":") {
                    isKey = false
                } else if (childrenString[i] === "," || i == childrenString.length - 1) {
                  
                    correctedObject[currKey] = parseStringArray(currValue);
                   
                    currKey = ""
                    currValue = ""
                    isKey = true

                }
            }
            if (isKey) {
                childrenString[i] != ',' && (currKey += childrenString[i])
            } else {
                childrenString[i] != ':' && (currValue += childrenString[i])
            }

        }
       
        return correctedObject;
    }


}

/* 
values in the object returned by stringToJSON are all in string format
this function extracts the booleans, numbers, and arrays
from this format and fixes the object
*/
const correctValueTypes = (object) => {
  
    for (var [key, value] of Object.entries(object)) {

        // fix for booleans
        if (value === "false" || value === "true") {
            let bool = JSON.parse(value);
            object[key] = bool;
        }

        // fix for numbers
        let isnum = /^[+-]?(\d*\.)?\d+$/.test(value); // check if only number
        
        if (isnum) {
            let num = JSON.parse(value);
            object[key] = num;
        }

        // fix for arrays
        if (value.includes("[")) {
            let array = parseStringArray(value);
         
            object[key] = array;
        }
    }

    return object;
}


// abridged QR code keys are mapped to their respective longer names
const renameKeys = (data) => {

    const renamed = {};
    for (const [k, v] of Object.entries(data)) {
        if (k in keys) {
            renamed[keys[k]] = v;
        } else {
            renamed[k] = v;
        }
    }

    return renamed;
}

module.exports = { renameKeys, correctValueTypes, stringToJSON };