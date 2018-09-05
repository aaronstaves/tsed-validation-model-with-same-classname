import {Post, Controller, BodyParams} from "@tsed/common";
import Pet from "../models/Pet";

@Controller("/Pet")
export class PetsCtrl {

    @Post("/")
    save(@BodyParams() pet: Pet): Pet {
          console.log(pet instanceof Pet); // true
          return pet; // will be serialized according to your annotation on Pet class.
    }

}