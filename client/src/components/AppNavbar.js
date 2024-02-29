import { Navbar, NavLink, ScrollArea } from "@mantine/core";
import { useState } from "react";
import { IconListNumbers, IconUsers, IconTable } from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";

const AppNavbar = (props) => {
    const location = useLocation();
    const [opened, setOpened] = useState(false);
    const [active, setActive] = useState("Teams");
    const navigate = useNavigate();

    return (
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 250 }}>
            <NavLink label="Teams" icon={<IconUsers size="1rem" stroke={1.5} />} childrenOffset={28}>
                <ScrollArea h={350}>
                    { props.teams.map((item, index) => (
                        <NavLink
                            key={index}
                            active={index === active}
                            label={item}
                            onClick={() => {
                                setActive(index)
                                navigate(`/team/${item}`)
                            }}
                        />
                    ))}
                </ScrollArea>
            </NavLink>
            <NavLink label="Matches" icon={<IconListNumbers size="1rem" stroke={1.5} />} childrenOffset={28} active={active === "Matches" ? true : false}>
                <ScrollArea h={350}>
                    { props.matches.map((item, index) => (
                        <NavLink
                            key={index}
                            active={index + props.teams.length === active}
                            label={item}
                            onClick={() => {
                                setActive(index + props.teams.length);
                                navigate(`/match/${item}`);
                            }}
                        />
                    ))}
                </ScrollArea>
            </NavLink>
            <NavLink label="Compare" icon={<IconTable size="1rem" stroke={1.5} />} active={active === "Compare" ? true : false} onClick={() => {
                setActive("Compare");
                navigate("/compare");
            }}/>
        </Navbar>
)
}

export default AppNavbar