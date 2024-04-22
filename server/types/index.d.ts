type Roles =
    | "authenticated user"
    | "anonymous user"
    | "administrator"
    | "investor"
    | "maptrackuser"
    | "DEPTNODAL"
    | "CMSAUSER"
    | "EODBNODAL"
    | "nsws user"
    | "nicadmin"
    | "DEPTHOD"
    | "HELPDESKUSER"
    | "DM"
    | "SDO"
    | "DISTADMINUSER"
    | "GM-DIC"
    | "BDO-SDO-SDM-CHAIRMAN"
    | "*";

type User = {
    uid: string;
    username: string;
    rid: string;
    role: Roles;
    fname: string;
    mname: string;
    lname: string;
    mobile: string;
    email: string;
    access: string;
};

type Model = (params: any) => any;

type Controller = (req: import("express").Request, res: import("express").Response, next?: import("express").NextFunction) => any;

type Validator = (req: import("express").Request, res: import("express").Response, next?: import("express").NextFunction) => any;

type BulkSms = (message: string, type: string, recipients: string) => any;
