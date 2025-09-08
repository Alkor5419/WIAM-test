import axios from "axios";
import {
    LoanApplication,
    ApiResponse,
} from "../model/types";
import { BASE_URL } from "../../../shared/config/api";

export const loanApi = {
    submitLoanApplication: async (
        application: LoanApplication
    ): Promise<ApiResponse> => {
        try {
            const response = await axios.post(
                `${BASE_URL}/products/add`,
                {
                    title: application.title,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error(
                "Не удалось отправить заявку:",
                error
            );
            throw new Error("Не удалось отправить заявку");
        }
    },
};
