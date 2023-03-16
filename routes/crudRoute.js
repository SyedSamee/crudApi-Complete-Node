import  Express  from "express";
import crudController from "../controllers/crudController.js";
import protectedMiddleWare from '../middlewares/auth-middleware.js';
const router = Express.Router();
// middleware
router.use(protectedMiddleWare)

//post
router.post('/addItem',crudController.addItem);

// patch
router.patch('/updateField',crudController.updateField);
router.patch('/updateAllField',crudController.updateAllField);

//get
router.get('/getAllItem',crudController.get_all_item);

//delete

router.delete('/deleteItem',crudController.deleteItem);





export default  router;