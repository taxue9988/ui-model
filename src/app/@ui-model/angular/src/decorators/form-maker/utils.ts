import { ModelMetadata } from './model-metadata';
import { metaKeyModel, metaKeyType, Reflect } from './constants';
import { PropertyMetadata } from './property-metadata';
import { isNumber } from '../../validators/is-number.validator';
import { isBoolean } from '../../validators/is-boolean.validator';

export function getOrCreateModelMetadata(target: any): ModelMetadata {
  const result = Reflect.getMetadata(metaKeyModel, target);
  if (result) {
    return result;
  } else {
    const meta: ModelMetadata = {properties: []};
    Reflect.defineMetadata(metaKeyModel, meta, target);
    return meta;
  }
}

export function getOrCreateProperty(target: any, propertyName: string): PropertyMetadata {
  const formMeta = getOrCreateModelMetadata(target.constructor);
  if (!formMeta.properties) {
    formMeta.properties = [];
  }
  const result = formMeta.properties.find((property) => property.name === propertyName);
  if (result) {
    return result;
  } else {
    const property: PropertyMetadata = {name: propertyName, type: Reflect.getMetadata(metaKeyType, target, propertyName)};
    property.isArray = property.type === Array;
    property.isGroup = Reflect.hasMetadata(metaKeyModel, property.type);
    property.isControl = !property.isArray && !property.isGroup;
    property.dataTypeValidators = [];
    switch (property.type) {
      case Number:
        property.dataTypeValidators = [isNumber];
        break;
      case Boolean:
        property.dataTypeValidators = [isBoolean];
        break;
    }
    formMeta.properties.push(property);
    return property;
  }
}
