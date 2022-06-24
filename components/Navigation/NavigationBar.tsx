import style from './navigation.module.scss'
import { NavigationItem } from './NavigationItem'

export const NavigationBar: React.FC = () => (
    <nav className={style.navigation}>
        <ul>
            <NavigationItem to="/" emojiKey="house_with_garden" label="Home" />
            <NavigationItem to="/listing" emojiKey="scroll" label="Listing" />
            <NavigationItem to="/tags" emojiKey="bookmark" label="Tags" />
            <NavigationItem to="/faq" emojiKey="open_book" label="FAQ" />
            <NavigationItem to="/contact" emojiKey="card_index" label="Contact" />
            <NavigationItem to="/invite" emojiKey="envelope" label="Invite people" />
        </ul>
    </nav>
)
