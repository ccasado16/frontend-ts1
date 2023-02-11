import { BASE_API } from "../utils/constants";
import { addProductApi } from "./product";

export async function getTablesApi(token) {
  try {
    const url = `${BASE_API}api/tables/`;

    const params = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function addTableApi(data, token) {
  try {
    const formData = new FormData();

    formData.append("number", data.number);

    const url = `${BASE_API}api/tables/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateTableApi(id, data, token) {
  try {
    const formData = new FormData();

    formData.append("number", data.number);

    const url = `${BASE_API}api/tables/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteTableApi(id, token) {
  try {
    const url = `${BASE_API}api/tables/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
