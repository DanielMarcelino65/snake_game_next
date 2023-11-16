import Image from 'next/image'
import * as S from './styles'
import Wasd from '../../../../assets/wasd-tuto.png'
import Setas from '../../../../assets/setas-tuto.png'


const TutorialScreen = () => {
    return(
        <S.background>
            <S.TutorialContainer>
                <S.TextContainer>
                    <S.Text>Movimentação:</S.Text>
                    <S.RowContainer>
                        <S.StyledImage src={Setas} alt="Setas" />
                        <S.Text>ou</S.Text>
                        <S.StyledImage src={Wasd} alt="WASD" />
                    </S.RowContainer>
                </S.TextContainer>
                <S.ExampleContainer>
                </S.ExampleContainer>
            </S.TutorialContainer>
        </S.background>
    )
}

export default TutorialScreen