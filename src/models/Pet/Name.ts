import  {Property, MaxLength} from "@tsed/common";

export default class Name {
    @MaxLength(5)
    @Property()
    FirstName: string;

    @Property()
    LastName: string;
}