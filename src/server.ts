import express from "express";
import { router } from "./routes";
import {internalErrors} from "./middlewares/errors/internal_errors";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(router);

app.use(new internalErrors().syntaxError);

app.listen(port, () => console.log(`Server is running on port ${port}!`));