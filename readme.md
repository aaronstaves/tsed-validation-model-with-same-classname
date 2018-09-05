# Ts.ED Bug - Validation overridden(?) when 2 classes have the same name but different validation parameters

This repository was created to reproduce a bug I've encountered when using Ts.ED and validation with models/conversions.  This isn't the actual case but it does reproduce it.

This project has 2 Controllers, `Person` and `Pet` that can be accessed at `http://localhost:8080/rest/Person` and `http://localhost:8080/rest/Pet` respectively.

There are 2 Models that are identical, but for the sake of validation, they have been split up into separate Models with different validation on both.  Each model looks like this:

```
{
  "Name": {
    "FirstName": string,
    "LastName": string
  }
}
```

In the case of a `Person` the _FirstName_ is limited to 10 characters.  In the case of a `Pet` the _FirstName_ is limited to 5 characters.  

If you post to the `/rest/Person` endpoint with a _FirstName_ longer than 5 characters, you'll notice that the `Pet.FirstName` validation rule of `MaxLength(5)` takes precedent and stops the user from continuing.

A specific **curl** command is listed below to reproduce.  I can't exactly explain why this is happening, but if you do change one of the classnames from `Name` to something else it does work. 


## Install

> **Important!** Ts.ED requires Node >= 6, Express >= 4 and TypeScript >= 2.7.

```batch
npm install
```

## Run

```batch
npm start
```


## Reproduce Bug

```batch
curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{"Name": { "FirstName": "Matthew", "LastName": "Smith" } }' \
  http://localhost:8080/rest/Person
```

Should result in:

```
Bad request on parameter "request.body".<br />At Person.Name.FirstName, value 'Matthew' should NOT be longer than 5 characters⌂
```

Where 5 is the limit for the Pet model, not the Person model.
