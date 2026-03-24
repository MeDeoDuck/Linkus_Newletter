Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

projectDir = "c:\Users\seank\OneDrive\Desktop\linkus_newletter"

objShell.CurrentDirectory = projectDir

' Run the Node.js script
objShell.Run "node organize_structure.js", 1, True
