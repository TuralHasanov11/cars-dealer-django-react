import { useContext, useEffect } from 'react';
import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom';
import Cars from '../../components/auth/Cars'
import CarHorizontalCard from '../../components/ui/cards/CarHorizontal';
import AuthContext from '../../store/auth-context';
import UserContext from '../../store/user-context'

function UserCarsView(){

    const {user: authUser} = useContext(AuthContext)
    const {cars, user} = useContext(UserContext)
    const [searchParams] = useSearchParams()

    return <>
      <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="h2 text-light mb-0">Cars</h1>                    
      </div>
      {authUser.id === user.id &&
      <>  
            <p class="text-light pt-1 mb-4">Here you can see your car offers and edit them easily.</p>
          <ul className="nav nav-tabs nav-tabs-light border-bottom border-light mb-4" role="tablist">
              <li className="nav-item mb-3"><Link className={`${!searchParams.get('is_pending')?'active':''} nav-link`} to={`/user/${user.id}/cars`} role="tab" aria-selected="true"><i className="fi-file fs-base me-2"></i>Published</Link></li>
              <li className="nav-item mb-3"><Link className={`${searchParams.get('is_pending')?'active':''} nav-link`} to={`/user/${user.id}/cars?is_pending=1`} role="tab" aria-selected="false"><i className="fi-file-clean fs-base me-2"></i>Drafts</Link></li>
          </ul>
      </>}
        {cars.map((car, index)=>( <CarHorizontalCard car={car} key={index}/>))}
    </>
}

export default UserCarsView;

