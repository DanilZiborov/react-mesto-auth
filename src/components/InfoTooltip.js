
import registerSuccessImg from '../images/register-success.svg';
import registerFailImg from '../images/register-fail.svg';


function InfoTooltip({ isRegisterSuccess, isOpen, onClose }) {
  return (
    <div className={`tooltip ${isOpen && 'tooltip_opened'}`}>
      <div className="tooltip__container">
        <img src= {isRegisterSuccess ? registerSuccessImg : registerFailImg} className="tooltip__image" alt='' />
        <p className="tooltip__text">{
          isRegisterSuccess ?
          'Вы успешно зарегистрировались!' :
          'Что-то пошло не так! Попробуйте ещё раз.'
        }</p>
        <button type="button" className="tooltip__close-button" onClick={onClose} />
      </div>
    </div>
  )
}

export default InfoTooltip;
