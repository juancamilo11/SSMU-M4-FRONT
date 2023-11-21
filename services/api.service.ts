export class ApiService {
  public post<T>(
    data: T,
    url: string,
    authRequired: boolean = false
  ): Promise<T> {
    const config: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    if (authRequired) {
      const token = `Bearer ${localStorage.getItem('access_token')}`;
      config.headers = { ...config.headers, Authorization: token };
    }

    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL + url}`, {
      ...config,
    })
      .then((response) => response.json())
      .then((data) => data as T);
  }

  public get<T>(
    url: string,
    query?: { [key: string]: any },
    authRequired: boolean = false
  ): Promise<T> {
    const config: RequestInit = {
      method: 'GET',
    };
    const params = new URLSearchParams(query).toString();
    if (authRequired) {
      const token = `Bearer ${localStorage.getItem('access_token')}`;
      config.headers = { ...config.headers, Authorization: token };
      console.log({ token: token, url: url });
    }
    return fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL + url}?${params}`,
      {
        ...config,
      }
    )
      .then((response) => response.json())
      .then((data) => data as T);
  }

  public delete<T>(url: string, authRequired: boolean = false): Promise<T> {
    const config: RequestInit = {
      method: 'DELETE',
    };
    if (authRequired) {
      const token = `Bearer ${localStorage.getItem('access_token')}`;
      config.headers = { ...config.headers, Authorization: token };
      console.log({ token: token, url: url });
    }
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
