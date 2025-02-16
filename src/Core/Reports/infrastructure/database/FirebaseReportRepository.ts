
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { ReportRepository } from "../../domain/repository/ReportRepository";
import { Report } from "../../domain/model/Report";
import { firebaseApp } from "../../../Config/firebaseconfig";

const database = firebaseApp;
const collectionName: string = "Reports";

export class FirebaseReportRepository implements ReportRepository {
    async getAllBetweenDates(startDate: Date, endDate: Date): Promise<Report[]> {
        const customeQuery = query(this.collection, where("meetingDate", ">=", startDate), where("meetingDate", "<=", endDate))
        const reports = await getDocs(customeQuery);

        const documentList = reports.docs.map((doc) => doc);
        const convertedList = documentList.map((doc) => {
            const report = { id: doc.id, data: doc.data() }
            return new Report(
                report.id,
                report.data.familyGroup,
                report.data.activeMembers,
                report.data.activeMembersChildren,
                report.data.noActiveMembers,
                report.data.noActiveMembersChildren,
                report.data.visitorChildren,
                report.data.visitors,
                report.data.totalAttendance,
                report.data.visitedHomes,
                report.data.newChristians,
                report.data.reconciled,
                report.data.vigilAttendance,
                report.data.offering,
                report.data.notes,
                new Date(report.data.meetingDate.seconds * 1000),
                report.data.creationDate,
                report.data.createdBy
            )
        })
        return convertedList;
    }

    async delete(id: string): Promise<void> {
        try {
            const docRef = doc(database, `${collectionName}/${id}`)
            await deleteDoc(docRef)
            return Promise.resolve()
        } catch (error) {
            console.log(error)
            return Promise.reject()
        }
    }

    async update(report: Report): Promise<void> {
        try {
            const docRef = doc(database, `${collectionName}/${report.id}`)
            await updateDoc(docRef, {
                activeMember: report.activeMembers,
                activeMemberChildren: report.activeMembersChildren,
                noActiveMember: report.noActiveMembers,
                noActiveMemberChildren: report.noActiveMembersChildren,
                visitorChildren: report.visitorChildren,
                visitors: report.visitors,
                totalAttendance: report.totalAttendance,
                visitedHomes: report.visitedHomes,
                newChristians: report.newChristians,
                reconciled: report.reconciled,
                vigilAttendance: report.vigilAttendance,
                offering: report.offering,
                notes: report.notes,
                meetingDate: report.notes
            })
            return Promise.resolve()
        } catch (error) {
            console.log(error)
            return Promise.reject()
        }
    }

    private collection = collection(database, collectionName)

    async getOneById(id: string): Promise<Report> {
        const docRef: any = doc(database, collectionName, id)
        const docSnap = await getDoc(docRef)
        const report: any = { id: docSnap.id, data: docSnap.data() }

        return Promise.resolve(new Report(
            report.id,
            report.data.familyGroup,
            report.data.activeMember,
            report.data.activeMemberChildren,
            report.data.noActiveMember,
            report.data.noActiveMemberChildren,
            report.data.visitorChildren,
            report.data.visitors,
            report.data.totalAttendance,
            report.data.visitedHomes,
            report.data.newChristians,
            report.data.reconciled,
            report.data.vigilAttendance,
            report.data.offering,
            report.data.notes,
            new Date(report.data.meetingDate.seconds * 1000),
            report.data.creationDate,
            report.data.createdBy))
    }

    async create(report: Report): Promise<void> {
        const reportData = {
            ...report,
            familyGroup: {
                name: report.familyGroup?.name || "",
                color: report.familyGroup?.color || ""
            }
        };

        await addDoc(this.collection, reportData);
        return Promise.resolve()
    }

    getStartEndWeek() {
        const now = new Date();

        // Calcular el inicio de la semana (lunes)
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Ajusta el primer día de la semana (lunes)
        startOfWeek.setHours(0, 0, 0, 0);

        // Calcular el fin de la semana (domingo)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Domingo
        endOfWeek.setHours(23, 59, 59, 999);
        return { startOfWeek, endOfWeek }
    }
}