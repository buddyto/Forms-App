import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;
  constructor( private fb: FormBuilder, private validadores: ValidadoresService) { 
    this.crearFormulario();
    // this.cargarDataAlFormulario();
    this.crearListeners();
   }

  ngOnInit(): void {
  }
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }
  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }
  get provinciaNoValido(){
    return this.forma.get('direccion.provincia').invalid && this.forma.get('direccion.provincia').touched
  }
  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }
  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }
  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }
  get pass2NoValido(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }

  crearListeners(){
    //esto para ver
    // this.forma.valueChanges.subscribe(valor => {
    //   console.log(valor)
    // })
    // this.forma.statusChanges.subscribe(status => console.log(status))
    //esto par aver un campo
    this.forma.get('nombre').valueChanges.subscribe(console.log)
  }

  crearFormulario(){

    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2), this.validadores.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        provincia: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }
  cargarDataAlFormulario(){
    this.forma.setValue({
      nombre: 'Juan',
      apellido: 'Perez',
      correo: 'juan@gmail.com',
      direccion: {
        provincia: 'Sta fe',
        ciudad: 'Esperanza'
      }
    })
  }

  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control(''))
  }
  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }




  guardar(){
    if (this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control => {
        control.markAllAsTouched()
    })
   }
   console.log(this.forma.value)
   this.forma.reset({
     nombre: 'Sin nombre'
   }); 
  }



} 
