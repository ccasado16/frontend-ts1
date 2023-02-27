import { BASE_API } from "../utils/constants";

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

    if (!(await tableExists(data.number, token))) {
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
    } else {
      console.log("la mesa ya existe");
    }
  } catch (error) {
    throw error;
  }
}

export async function updateTableApi(id, data, token) {
  try {
    const formData = new FormData();

    formData.append("number", data.number);

    if (!(await tableExists(data.number, token))) {
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
    } else {
      console.log("La mesa ya existe");
    }
  } catch (error) {
    throw error;
  }
}

async function tableExists(number, token) {
  const tables = await getTablesApi(token);
  const number_tables = tables.map((table) => table.number);
  return number_tables.includes(number);
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

export async function getTableApi(id) {
  try {
    const url = `${BASE_API}api/tables/${id}/`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getTableByNumberApi(numberTable) {
  try {
    const tableFilter = `number=${numberTable}`;
    const url = `${BASE_API}api/tables/?${tableFilter}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
