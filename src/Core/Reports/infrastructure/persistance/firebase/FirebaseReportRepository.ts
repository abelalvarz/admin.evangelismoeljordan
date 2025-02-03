
import { firebaseApp } from "../../../../Shared/utils/firebaseconfig";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import { ReportRepository } from "../../../domain/repository/ReportRepository";
import { Report } from "../../../domain/model/Report";

const database = firebaseApp;
const collectionName: string = "Reports";
export class FirebaseReportRepository implements ReportRepository {

    private readonly collection = collection(database, collectionName)

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

    async getAll(): Promise<Report[]> {

        const reports = await getDocs(this.collection);
        const documentList = reports.docs.map((doc) => {
            const data = doc.data()
            const dataToReturn = { id: doc.id, data: data }
            return dataToReturn
        })

        const convertedList = documentList.map((doc: any) => new Report(
            doc.id,
            doc.data.familyGroup,
            doc.data.activeMember,
            doc.data.activeMemberChildren,
            doc.data.noActiveMember,
            doc.data.noActiveMemberChildren,
            doc.data.visitorChildren,
            doc.data.visitors,
            doc.data.totalAttendance,
            doc.data.visitedHomes,
            doc.data.newChristians,
            doc.data.reconciled,
            doc.data.vigilAttendance,
            doc.data.offering,
            doc.data.notes,
            new Date(doc.data.meetingDate.seconds * 1000),
            doc.data.creationDate,
            doc.data.createdBy
        ))
        return Promise.resolve(convertedList)
    }

    async getByPeriod(initialDate: Date, finalDate: Date): Promise<Report[]> {
        const customeQuery = query(this.collection, where("meetingDate", ">=", initialDate), where("meetingDate", "<=", finalDate))
        const reports = await getDocs(customeQuery);

        const documentList = reports.docs.map((doc) => doc);
        const convertedList = documentList.map((doc) => {
            const report = {id:doc.id, data:doc.data()}
            return new Report(
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
                report.data.createdBy
            )
        })
        return Promise.resolve(convertedList)
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