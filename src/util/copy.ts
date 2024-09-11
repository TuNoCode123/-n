import _ from "lodash";
export const copyObject = (o: any) => {
  try {
    const newObject = _.cloneDeep(o);
    return newObject;
  } catch (error) {
    console.log(error);
  }
};
