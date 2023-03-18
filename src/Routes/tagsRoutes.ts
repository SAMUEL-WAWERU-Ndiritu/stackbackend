import { Router } from 'express';
import { getTags, getSingleTag } from '../controllers/TagsController';

const tagsrouter = Router();

tagsrouter.get('/tags', getTags);
tagsrouter.get('/tags/:tagname', getSingleTag);

export default tagsrouter;
