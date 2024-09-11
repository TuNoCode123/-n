import _ from "lodash";

export const differentObject = (obj1: any, obj2: any) => {
  const differentValues = _.pickBy(
    obj1,
    (value, key) => _.has(obj2, key) && !_.isEqual(value, obj2[key])
  );
  return differentValues;
};
