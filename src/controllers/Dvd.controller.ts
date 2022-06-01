import { Request, Response } from "express";
import DvdService from "../services/Dvd.service";
class DvdController {
  postDvdcontroller = async (request: Request, response: Response) => {
    const { status, message } = await DvdService.postDvdService(request.body);
    return response.status(status).json(message);
  };
  getDvdsController = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { status, message } = await DvdService.getDvdsService(id);
    return response.status(status).json(message);
  };
  buyDvdController = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { quantity } = request.body;
    const { userEmail } = request;
    const { status, message } = await DvdService.buyDvdService(
      id,
      quantity,
      userEmail
    );
    return response.status(status).json(message);
  };
}
export default new DvdController();
