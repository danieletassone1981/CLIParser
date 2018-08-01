/// <reference path="./typings/node/node.d.ts" />

export class CLIParser {
  
  private defaultValue: boolean = true;
  private defaultSeparator: string = "--";
  public constructor () {
  }

  public parseCLI (input?: string) {
    
    return new Promise<any> ((resolve, reject)  => {

      const result: any = {};
      const inputModified: {input: string, nextCursor: number, separator: string} = {input: input, nextCursor: 0, separator: this.defaultSeparator};
      let option: string;
      let value: any;

      do {
          option = this.getNextOption(inputModified); // take the next Command-Option
          value = this.getNextValue(inputModified); // take the next value associated

          // build the final-result-object
          if (option!="") {
            if (result[option] == undefined) {
              result[option] = value;
            } else {
              if (typeof(result[option])=="object") {
                result[option].push (value);
              } else {
                result[option] = [result[option], value];
              }
            }
          } else {
            break;
          }
        }while(true);
      
      resolve (result);
    });
  }

  private getNextOption (inputModified: {input: string, nextCursor: number, separator: string}) {
    // find the next Option/Command by looking for " " and move the cursor forward
    let nextCursor: number = inputModified.input.indexOf(" ", inputModified.nextCursor);
        nextCursor == -1 ? nextCursor = inputModified.input.length : null;
    const myOption: string = inputModified.input.substring(inputModified.nextCursor, nextCursor).replace(inputModified.separator, "")
          inputModified.nextCursor = nextCursor + 1;
    return myOption;
  }

  private getNextValue (inputModified: {input: string, nextCursor: number, separator: string}) {
    // find the next value by looking for the next " " and move the cursor forward
    let nextCursor: number = inputModified.input.indexOf(" ", inputModified.nextCursor);
        nextCursor == -1 ? nextCursor = inputModified.input.length : null;
    let value: string = inputModified.input.substring(inputModified.nextCursor, nextCursor);
    let result: any;
    // find out the right Type (string, number or true)
    if (value.indexOf(inputModified.separator) >= 0 || value == "") {
      result = this.defaultValue;
      inputModified.nextCursor+1;
    } else {
      inputModified.nextCursor+=value.length+1;
      result = this.getValueType(value);
    }

    return result;
  }

  private getValueType (value: string) {
    if (this.isNumber(value)) {
      return parseInt(value);
    } else {
      return value;
    }
  }

  private isNumber(num) {
    return !isNaN(num);
  }
}


    /*const b:CLIParser = new CLIParser();
          b.parseCLI("--a");*/
