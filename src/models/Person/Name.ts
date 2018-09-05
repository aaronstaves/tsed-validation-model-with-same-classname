import  {Property, MaxLength} from "@tsed/common";

export default class Name {
    @MaxLength(10)
    @Property()
    FirstName: string;

    @Property()
    LastName: string;
}