import styled from "styled-components";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config";
import { NavLink } from "react-router-dom";

const StyledDetails = styled.div`
	display: flex;
	flex-direction: column;

	list-style: none;
	z-index: 0;
	position: fixed;
	right: 0;

	background-color: white;
	border-radius: 8px;
	box-shadow: 0px 0px 12px 0px rgba(66, 68, 90, 1);
	margin-top: 10px;
	margin-right: 50px;
	margin-top: 10%;
	width: 500px;
	height: 500px;
`;

const StyledContainer = styled.div`
	margin: 10px;
	width: 200px;
	height: 200px;
	border: 1px solid black;
	border-radius: 5px;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	background-image: url(${(props) => props.imageUrl});
`;

const StyledTopSection = styled.div`
	display: flex;
	flex-direction: row;
`;

const StyledDataSection = styled.div`
	margin: 10px;
	& li {
		margin-bottom: 20px;
	}
`;
const StyledButtonSection = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	margin-top: 20px;
`;
const StyledButton = styled.button`
	width: 100px;
	height: 50px;
	background-color: #00875a;
	color: white;
	border: none;
	border-radius: 5px;
	box-shadow: 0px 1px 2px 1px rgba(102, 102, 102, 0.73);
	cursor: pointer;
	&: active {
		box-shadow: inset 0px -1px 2px 1px rgba(102, 102, 102, 0.73);
	}
`;

const StyledNotesSection = styled.div`
	margin: 0px 15px 15px 15px;
	padding: 10px;
	height: 30%;
	border: 1px solid black;
	border-radius: 5px;
	box-shadow: 0px 0px 6px 0px rgba(66, 68, 90, 1);
`;

const StyledLink = styled(NavLink)`
	text-decoration: none;
	color: white;
`;

export const AdoptedAnimalDetails = ({ animal, animals, animalData }) => {
	const changeAdoptedStatus = async () => {
		try {
			await setDoc(doc(db, "animals", animal.id), animal);
			await deleteDoc(doc(db, "adopted_animals", animal.id));
		} catch (error) {
			console.log("text:", error);
		}
	};
	const deleteFromList = async () => {
		await deleteDoc(doc(db, "adopted_animals", animal.id));
	};

	// const updateAnimalDetails = async () => {
	// 	await db.collection("animals").doc(animal.id).update({
	// 		id: newId,
	// 		name: newName,
	// 		age: newAge,
	// 		species: newSpecies,
	// 		animalBehavior: 0,
	// 		humanBehavior: 0,
	// 		imageUrl: "",
	// 	});
	// };

	return (
		<StyledDetails key={animal.id}>
			<StyledTopSection>
				<StyledContainer imageUrl={animal.imageUrl}></StyledContainer>
				<StyledDataSection>
					<li>Chip number: {animal.id}</li>
					<li>Name: {animal.name}</li>
					<li>Age: {animal.age}</li>
					<li>Species: {animal.species}</li>
					<li>Behavior around other animals: {animal.animalBehavior}</li>
					<li>Behavior around humans: {animal.humanBehavior}</li>
				</StyledDataSection>
			</StyledTopSection>
			<StyledNotesSection>{animal.notes}</StyledNotesSection>
			<StyledButtonSection>
				<StyledButton onClick={changeAdoptedStatus}>
					Restore to animal list
				</StyledButton>
				<StyledButton>
					<StyledLink to={`/editadeoptedanimal/${animal.id}`}>
						Update animal details
					</StyledLink>
				</StyledButton>
				<StyledButton onClick={deleteFromList}>Delete from list</StyledButton>
			</StyledButtonSection>
		</StyledDetails>
	);
};
