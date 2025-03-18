import LeftNavBar from "../componenti/NavbarDesktop";
import NavFooter from "../componenti/NavFooter";

function WIPPage(){
    return (
        <>
        <LeftNavBar>
            <div className="d-flex poppins-regular align-items-center justify-content-center">
                <div className="text">
                <h1><b>PAGINA IN COSTRUZIONE</b></h1>
                </div>
            </div>
            {/* Footer Navbar solo su Mobile */}
            <div className="d-md-none">
                <NavFooter />
            </div>
        </LeftNavBar>
        </>
    )
}

export default WIPPage;