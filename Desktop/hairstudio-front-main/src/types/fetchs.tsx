export type fetchReservationsType =
  | fetchReservationsUserType
  | fetchReservationsBarberType;
  
export type fetchReservationsUserType = {
  id:number;
  id_provide: string;
  id_frizer: number;
  date: string;
  time: string;
  id_user: number;
  provide_table: {
    id: number;
    id_salon: number;
    name: string;
    time: string;
    about: string;
    price: string;
    created_at: null | string;
    updated_at: null | string;
  } | null;
  barbers_table: {
    id: number;
    name: string;
    surname: string;
    flag: string;
    email: string;
    phone: string;
    smena: string;
    email_verified_at: null | string;
    created_at: null | string;
    updated_at: null | string;
    id_salon: number;
  };
};

export type fetchReservationsBarberType = {
  id:number;
  date: string;
  id_provide: string;
  id_user: number;
  time: string;
  user_table: {
    created_at: string;
    email: string;
    email_verified_at: string | null;
    flag: string;
    id: number;
    id_salon: number | null;
    name: string;
    phone: string;
    smena: string;
    surname: string;
    updated_at: string;
  };
};
