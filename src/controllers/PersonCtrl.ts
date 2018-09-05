import {Post, Controller, BodyParams} from "@tsed/common";
import Person from "../models/Person";

@Controller("/Person")
export class PersonsCtrl {

    @Post("/")
    save(@BodyParams() person: Person): Person {
          console.log(person instanceof Person); // true
          return person; // will be serialized according to your annotation on Person class.
    }

}