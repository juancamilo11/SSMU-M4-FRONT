export class ApiService {
  public post<T>(data: T, url: string): Promise<T> {
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL + url}`, {
      ...config,
    })
      .then((response) => response.json())
      .then((data) => data as T);
  }

  public get<T>(url: string): Promise<T> {
    const config = {
      method: 'GET',
    };
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL + url}`, {
      ...config,
    })
      .then((response) => response.json())
      .then((data) => data as T);
  }

  public delete<T>(url: string): Promise<T> {
    const config = {
      method: 'DELETE',
    };
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL + url}`, {
      ...config,
    })
      .then((response) => response.json())
      .then((data) => data as T);
  }

  async patch(data: any, url: string) {
    let rta;

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL + url}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => (rta = data))
      .catch((error) => {
        console.log(error);
        rta = { message: 'Algo salió mal...' };
      });

    return rta;
  }
}
