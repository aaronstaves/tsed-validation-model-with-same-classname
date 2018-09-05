import  {Property, Minimum, PropertyType} from "@tsed/common";
import Name from "./Person/Name";

export default class Person {
    @Property()
    Name: Name;
}