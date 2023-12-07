import imgProfile from '../assets/profile.png'

function Profile({profil,setProfile}) {
  return (
    <div className="flex flex-col p-5 w-80 border rounded-md m-auto justify-center items-center gap-5">
        <img
          src={imgProfile}
          loading="lazy"
          alt="local"
          className="w-30 h-30 rounded-full"
        />
        <div className=''>Name: {profil.name}</div>
        <div>Last Name: {profil.surname}</div>
        <div>Phone: {profil.phone}</div>
        <div>E-mail: {profil.email}</div>
    </div>
  )
}

export default Profile
