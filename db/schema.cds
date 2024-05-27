using {cuid, managed  } from '@sap/cds/common';


namespace employeeDB;

entity employees :managed {
    key email : String(30);
    firstName : String(20);
    lastName : String(20);
    age : Integer;
    dateOfBirth : Date;
    dateOfJoin : Date;
    designation : String(50);
    department : String(50);
    contactNo : String(15);
}



