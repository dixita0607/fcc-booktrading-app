import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              public authService: AuthService,
              private userService: UserService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.createForm();
    this.setValueInForm();
  }

  setValueInForm() {
    this.loading = true;
    this.userService.getUser().subscribe(
      (user: User) => {
        this.loading = false;
        user.fullName && this.form.controls['fullName'].setValue(user.fullName);
        user.city && this.form.controls['city'].setValue(user.city);
        user.state && this.form.controls['state'].setValue(user.state);
      },
      error => this.toastService.showToast('Could not find user.', true)
    );
  }

  createForm() {
    this.form = this.fb.group({
      fullName: '',
      city: '',
      state: undefined
    });
  }

  updateProfile() {
    this.loading = true;
    this.userService.updateUser(
      this.form.controls['fullName'].value,
      this.form.controls['city'].value,
      this.form.controls['state'].value,
    ).subscribe(
      response => {
        this.userService.getUser().subscribe(
          (user: User) => {
            this.form.reset({
              fullName: user.fullName,
              city: user.city,
              state: user.state
            });
            this.toastService.showToast('Profile updated.');
          }
        );
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastService.showToast('Could not update profile.', true);
      }
    )
  }

}
