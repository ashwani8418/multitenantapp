using { employeeDB  } from '../db/schema';

service empSrv {
    entity employees as projection on employeeDB.employees;
}