
/**
 * @swagger
 * components:
 *   schemas:
 *     Return:
 *       type: object
 *       properties:
 *         status:
 *           type: bool
 *         message:
 *           type: string
 *         objeto:
 *           type: object
 */
export class Return{
    status:boolean;
    message:string | any;
    objeto:any;
}